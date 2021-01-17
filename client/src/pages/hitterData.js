import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HitterData = () => {
    const [hitters, setHitters] = useState(null);

    useEffect(() => {
        axios.get('data/hitter_ratings.csv')
            .then(response => {
                const [firstRow, ...restRows] = response.data.split('\r\n');
                const heading = firstRow.split(',');
                const table = restRows.map(row => {
                    const columns = row.split(',');
                    return columns.reduce((acc, cur, index) => {
                        acc[heading[index]] = cur.trim();
                        return acc;
                    }, {});
                });
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
