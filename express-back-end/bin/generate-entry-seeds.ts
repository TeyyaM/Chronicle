import faker from "faker";
import fs from 'fs';

const createFakeEntries = (category: number | null) => {

  const getPercentage = () => {
    return Math.random() * 100
  };

  const varyMood = (mood: number, varyChance: number, hoursAgo: number, avgTimeAgo: number) => {
    // Make the mood less extreme overall
    let newMood = mood;
    if (getPercentage() > 50) {
      newMood = 3;
    }
    // Make the example moods get happier over time
    if (varyChance > 0) {
      const varyMood = getPercentage();
      if (varyMood <= varyChance) {
        if (hoursAgo < avgTimeAgo && newMood !== 1) {
          newMood--
        }
        if (hoursAgo > avgTimeAgo && newMood !== 5) {
          newMood++
        }
      }
    }
    
    return newMood;
  }

  const maxTimeAgo = 40000;
  let mood: number | null;
  // make it so not all entries have moods
  (getPercentage() >= 60) 
  ? mood = Math.ceil(Math.random() * 5)
  : mood = null;
  const hoursAgo = Math.floor(Math.random() * maxTimeAgo);
  // bring the average mood down for the first half, not the second
  if (mood) {
    mood = varyMood(mood, 80, hoursAgo, maxTimeAgo / 2);
  }
  
  return(`
  ('${faker.lorem.sentence()}',
  '${faker.lorem.paragraph()}',
  ${mood},
  NOW() -  interval '${hoursAgo} hours',
  ${category},
  1)`)
  };

const generateEntries = () => {
  let fakeEntries = `INSERT INTO entries (
                    title,
                    content,
                    mood,
                    date_created,
                    category_id,
                    user_id
                    ) VALUES `
  const desiredFakeEntries = 600;
  for (let i = 0; i < desiredFakeEntries; i++) {
    // Create half the entries with categories, the other half without
    (i < desiredFakeEntries / 2) 
    // Math.ceil to ensure category is never 0
    ? fakeEntries += createFakeEntries(Math.ceil(Math.random() * 5))
    : fakeEntries += createFakeEntries(null);
    // Add a comma or semi-colon (if last) for syntax
    (i < desiredFakeEntries - 1) ? fakeEntries += ',' : fakeEntries += ';'
  }
  fs.writeFileSync('./db/seeds/01_dev_entries.sql', fakeEntries, { encoding: "utf8" })
}

generateEntries();

