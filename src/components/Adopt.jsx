function Adopt({ pets }) {
  console.log("ADOPT PAGE RENDERED");
  console.log("PETS RECEIVED:", pets);

  if (!pets || pets.length === 0) {
    return <h3 style={{ padding: "40px" }}>Here are Your Recommendations</h3>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Recommended Pets 🐾</h2>

      <div style={grid}>
        {pets.map((pet) => (
          <div key={pet.id} style={card}>
            <h3>{pet.name}</h3>
            <p>{pet.type}</p>
            <p>
              <strong>Energy:</strong> {pet.energy}
            </p>
            <p>
              <strong>Care:</strong> {pet.maintenance}
            </p>
            <button style={btn}>Adopt</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const card = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "16px",
  background: "#fff",
};

const btn = {
  marginTop: "10px",
  padding: "6px 12px",
};

export default Adopt;
