import faker from "faker";
import fs from 'fs';
const createFakeEntries = (category) => {
    const getPercentage = () => {
        return Math.random() * 100;
    };
    const varyMood = (mood, varyChance, hoursAgo, avgTimeAgo) => {
        let newMood = mood;
        if (getPercentage() > 50) {
            newMood = 3;
        }
        if (varyChance > 0) {
            const varyMood = getPercentage();
            if (varyMood <= varyChance) {
                if (hoursAgo < avgTimeAgo && newMood !== 1) {
                    newMood--;
                }
                if (hoursAgo > avgTimeAgo && newMood !== 5) {
                    newMood++;
                }
            }
        }
        return newMood;
    };
    const maxTimeAgo = 40000;
    let mood;
    (getPercentage() >= 60)
        ? mood = Math.ceil(Math.random() * 5)
        : mood = null;
    const hoursAgo = Math.floor(Math.random() * maxTimeAgo);
    if (mood) {
        mood = varyMood(mood, 80, hoursAgo, maxTimeAgo / 2);
    }
    return (`
  ('${faker.lorem.sentence()}',
  '${faker.lorem.paragraph()}',
  ${mood},
  NOW() -  interval '${hoursAgo} hours',
  ${category},
  1)`);
};
const generateEntries = () => {
    let fakeEntries = `INSERT INTO entries (
                    title,
                    content,
                    mood,
                    date_created,
                    category_id,
                    user_id
                    ) VALUES `;
    const desiredFakeEntries = 600;
    for (let i = 0; i < desiredFakeEntries; i++) {
        (i < desiredFakeEntries / 2)
            ? fakeEntries += createFakeEntries(Math.ceil(Math.random() * 5))
            : fakeEntries += createFakeEntries(null);
        (i < desiredFakeEntries - 1) ? fakeEntries += ',' : fakeEntries += ';';
    }
    fs.writeFileSync('./db/seeds/01_dev_entries.sql', fakeEntries, { encoding: "utf8" });
};
generateEntries();
