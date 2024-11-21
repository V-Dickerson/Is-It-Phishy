import { Pool } from "pg/lib";
// import { config } from "../../next.config";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.CERT
    }
  });


export default async function handler(request, response) {
    // const { title, description, date, time } = request.body;
    // const query = `INSERT INTO events (title, description, event_date, event_time)
//   VALUES ('${title}', '${description}', '${date}', '${time}');`;
    // console.log(config.toString())

    const query = `
        SELECT json_build_object(
            'url', "ModelData".url,
            'url_data', to_jsonb("ModelData") - 'url' - 'status',
            'model_answer', "Prediction".prediction,
            'model_confidence', "Prediction".probability,
            'answer', "ModelData".status
        ) AS data
        FROM "ModelData"
        INNER JOIN "Prediction"
        ON "ModelData".index = "Prediction".index
        ORDER BY RANDOM()
        LIMIT 1;
    `;




  
    try {
      const client = await pool.connect();
      const url_details = await client.query(query);
      response.json(url_details.rows[0].data);
      client.release();
    } catch (err) {
      response.status(500).json({
        message: err.message
      });
    }
  }