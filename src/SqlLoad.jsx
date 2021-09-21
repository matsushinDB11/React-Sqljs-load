import React, { useState, useEffect } from "react";
import "./styles.css";
import initSqlJs from "sql.js";

export default function SqlLoad() {
  const [dbState, setDb] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
      Promise.all([initSqlJs(), fetch("./database1.sqlite3")])
        .then(async (res) => {
          const SQLite = res[0],
            dbStorage = res[1];
          const db = new SQLite.Database(
            new Uint8Array(await dbStorage.arrayBuffer())
          );
          // me.setState({db: db});
          setDb(db);
        })
        .catch((err) => {
          // me.setState({err});
          setError(err);
        });
  },[]);

  // return <p>gegege</p>;
  if (error) return <pre>{error.toString()}</pre>;
  else if (!dbState) return <pre>Loading...</pre>;
  else return <SQLRepl db={dbState} />;
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
function SQLRepl({ db }) {
    const [error, setError] = useState(null);
    const [results, setResults] = useState([]);

    function exec(sql) {
        try {
            // The sql is executed synchronously on the UI thread.
            // You may want to use a web worker here instead
            setResults(db.exec(sql)); // an array of objects is returned
            setError(null);
        } catch (err) {
            // exec throws an error when the SQL statement is invalid
            setError(err);
            setResults([]);
        }
    }

    return (
        <div className="App">
            <h1>React SQL interpreter</h1>

            <textarea
                onChange={(e) => exec(e.target.value)}
                placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
            ></textarea>

            <pre className="error">{(error || "").toString()}</pre>

            <pre>
        {
            // results contains one object per select statement in the query
            results.map(({ columns, values }, i) => (
                <ResultsTable key={i} columns={columns} values={values} />
            ))
        }
      </pre>
        </div>
    );
}

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
function ResultsTable({ columns, values }) {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((columnName, i) => (
                    <td key={i}>{columnName}</td>
                ))}
            </tr>
            </thead>

            <tbody>
            {
                // values is an array of arrays representing the results of the query
                values.map((row, i) => (
                    <tr key={i}>
                        {row.map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

