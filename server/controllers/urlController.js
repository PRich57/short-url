const Url = require('../models');
const ShortUniqueId = require('short-unique-id');

// Instantiate as per npm docs
const uid = new ShortUniqueId({ length: 10 })

exports.shortenUrl = async (req, res) => {
  const { originalUrl, user, customSlug } = req.body;
  try {
    // Check if the customSlug is url-safe with regex
    if (customSlug && /[^A-Za-z0-9_-]/.test(customSlug)) {
      return res.status(400).json({ message: "Custom URL can only contain alphanumeric characters, hyphens, and underscores" });
    }

    if (customSlug) {
      // Check if the customSlug already exists
      const existingUrl = await Url.findOne({ shortId: customSlug });
      if (existingUrl) {
        return res.status(409).json({ message: "Custom URL already in use" })
      }
    }

    // Use custom slug if provided, otherwise use randomly generated short uid
    const shortUrl = customSlug || uid.rnd();
    const url = await Url.create({
      originalUrl,
      shortId: shortUrl,
      user
    });

    res.status(201).json(url);
  } catch (err) {
    res.status(500).json({ message: "Unknown error occurred" })
  }
}