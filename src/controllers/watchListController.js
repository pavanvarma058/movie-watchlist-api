import { prisma } from "../config/db.js";

export const addToWatchList = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // verify movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // check if already added to watchlist
  const existingWatchList = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingWatchList) {
    return res.status(400).json({ error: "Movie already in watchlist" });
  }

  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId: movieId,
      status: status || "Plan to Watch",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "success",
    data: {
      watchListItem,
    },
  });
};

export const updateWatchListItem = async (req, res) => {
  const { status, rating, notes } = req.body;

  const watchListItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchListItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  if (watchListItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to delete this item" });
  }

  // Build update data
  const updateData = {};
  if (status !== undefined) updateData.status = status.toUpperCase();
  if (rating !== undefined) updateData.rating = rating;
  if (notes !== undefined) updateData.notes = notes;

  // Update watchlist item
  const updatedItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    },
  });
};

export const removeFromWatchList = async (req, res) => {
  const watchListItem = await prisma.watchListItem.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!watchListItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  if (watchListItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to delete this item" });
  }

  await prisma.watchListItem.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({
    status: "success",
    message: "Movie removed from watchlist",
  });
};
