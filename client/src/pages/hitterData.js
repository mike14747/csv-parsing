import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HitterData = () => {
    const [hitters, setHitters] = useState(null);

    useEffect(() => {
        axios.get('data/hitter_ratings.csv')
            .then(response => {
                // only return non-zero length rows of data and extract the first row as the header
                const [firstRow, ...restRows] = response.data.split(/(?:\r\n|\n)+/).filter(row => row.length > 0);
                const heading = firstRow.split(',');
                const table = restRows.map(row => {
                    // split each row of the table (into columns) on commas unless the comma is within double quotes
                    // using a positive lookahead
                    const columns = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
                    // or using a negative lookahead
                    // const columns = row.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
                    return columns.reduce((acc, cur, index) => {
                        acc[heading[index]] = cur.trim();
                        return acc;
                    }, {});
                });
                console.log(table);
                setHitters(table);
            })
            .catch(error => {
                console.log(error);
                setHitters(null);
            });
    }, []);

    return (
        <div>
            <h1>This is the hitter data test page.</h1>
            {hitters &&
                <>
                    Header row has been loaded.
                </>
            }
        </div>
    );
};

export default HitterData;
