const fs = require('fs');
const csv = require('csv-parser');

// Create write streams for canada.txt and usa.txt
const canadaStream = fs.createWriteStream('canada.txt', { flags: 'a' }); // 'a' flag for append mode
const usaStream = fs.createWriteStream('usa.txt', { flags: 'a' });

// Write the header to canada.txt and usa.txt
canadaStream.write('country,year,population\n');
usaStream.write('country,year,population\n');

// Read the CSV file and filter data
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    if (row.country === 'Canada') {
      canadaStream.write(`${row.country},${row.year},${row.population}\n`, (err) => {
        if (err) {
          console.error('Error writing to canada.txt:', err);
        }
      });
    } else if (row.country === 'United States') {
      usaStream.write(`${row.country},${row.year},${row.population}\n`, (err) => {
        if (err) {
          console.error('Error writing to usa.txt:', err);
        }
      });
    }
  })
  .on('end', () => {
    console.log('Data filtered and written to canada.txt and usa.txt');

    // Close the write streams
    canadaStream.end();
    usaStream.end();
  })
  .on('error', (error) => {
    console.error('Error reading CSV file:', error);
  });
