import express from "express";
import { getBook, getTicker } from "./api.controller.js";

const router = express.Router();

router.get("/:pair", async (req, res) => {
  try {
    const pair = req.params.pair;
    // Check if a valid pair was entered, ex: BTC-USD, ETH-USD
    if (pair.match(/^[A-Z]+-?[A-Z]+$/)) {
      return res.json(await getTicker(pair));
    } else {
      return res
        .status(400)
        .json({ error: `Pair ${req.params.pair} is not valid` });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:pair/:operation/:size");

router.get("/:pair/restrict", async (req, res) => {
  try {
    const pair = req.params.pair;
    if (pair.match(/^(BTC|ETH)-USD$/g)) {
      return res.json(await getPairOrderBook(pair));
    } else {
      return res
        .status(400)
        .json({ error: `Unsupported pair ${req.params.pair}` });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
