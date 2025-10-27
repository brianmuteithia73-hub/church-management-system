const express = require('express');
const { body, validationResult } = require('express-validator');
const Mission = require('../models/Mission');
const auth = require('../middleware/auth');

const router = express.Router();

// Get mission content
router.get('/', async (req, res) => {
  try {
    let mission = await Mission.findOne();
    
    // Create default mission content if none exists
    if (!mission) {
      mission = new Mission({
        vision: 'To reach many campus students and make our world a better place for young Christians.',
        mission: 'We exist to love and honour God,love people,make disciples who will in turn transform the society.',
        values: [
          {
            title: 'Christ-Centered',
            description: 'We place Christ at the center of everything we do.'
          },
          {
            title: 'Spirit-Empowered',
            description: 'We rely on the Holy Spirit for guidance and power.'
          },
          {
            title: 'Socially Responsible',
            description: 'We serve our communities with compassion and love.'
          }
        ],
        bibleVerse: {
          text: 'Go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.',
          reference: 'Matthew 28:19'
        },
        history: 'Every Nation Church Nairobi was established in 2010 with a vision to see disciples and churches multiplying to transform nations for God\'s glory. What started as a small gathering of faithful believers has grown into a vibrant community impacting Nairobi and beyond.'
      });
      await mission.save();
    }
    
    res.json(mission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update mission content
router.put('/', [
  auth,
  body('vision').notEmpty().trim(),
  body('mission').notEmpty().trim(),
  body('values').isArray({ min: 1 }),
  body('bibleVerse.text').notEmpty().trim(),
  body('bibleVerse.reference').notEmpty().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let mission = await Mission.findOne();
    
    if (!mission) {
      mission = new Mission(req.body);
    } else {
      mission.vision = req.body.vision;
      mission.mission = req.body.mission;
      mission.values = req.body.values;
      mission.bibleVerse = req.body.bibleVerse;
      mission.history = req.body.history || mission.history;
    }

    await mission.save();
    res.json(mission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;