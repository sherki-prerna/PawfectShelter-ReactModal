// import pets from "./PetData";

// function PetCards({ recommendedCategories }) {
//   // If no categories are passed, show nothing
//   if (!recommendedCategories || recommendedCategories.length === 0) {
//     return <p>No pets to display.</p>;
//   }

//   // Filter pets based on recommended categories
//   const filteredPets = pets.filter((pet) =>
//     recommendedCategories.includes(pet.category),
//   );

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>Recommended Pets 🐾</h2>

//       <div style={gridStyle}>
//         {filteredPets.map((pet) => (
//           <div key={pet.id} style={cardStyle}>
//             <h3>{pet.name}</h3>
//             <p>
//               <strong>Type:</strong> {pet.type}
//             </p>
//             <p>
//               <strong>Energy:</strong> {pet.energy}
//             </p>
//             <p>
//               <strong>Care:</strong> {pet.maintenance}
//             </p>

//             <p style={{ fontStyle: "italic", marginTop: "8px" }}>
//               {pet.reason}
//             </p>

//             <button style={btnStyle}>Adopt</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// const gridStyle = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//   gap: "20px",
// };

// const cardStyle = {
//   border: "1px solid #ddd",
//   borderRadius: "10px",
//   padding: "16px",
//   backgroundColor: "#fff",
// };

// const btnStyle = {
//   marginTop: "10px",
//   padding: "6px 12px",
//   cursor: "pointer",
// };

// export default PetCards;

const PetCards = ({ pets }) => {
  if (!pets || pets.length === 0) {
    return <p>No recommendations yet</p>;
  }

  return (
    <div style={styles.container}>
      {pets.map((pet, index) => (
        <div key={pet.id} style={styles.card}>
          <h3>{pet.name}</h3>
          <p style={styles.meta}>
            {pet.type} • {pet.size} • {pet.energy} energy
          </p>

          <p>Match: {(pet.score * 100).toFixed(0)}%</p>

          <p>Rank #{index + 1}</p>
          <p style={styles.reason}>{pet.reason}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  card: {
    background: "#1e1e1e",
    padding: "15px",
    borderRadius: "12px",
    color: "white",
    width: "200px",
  },
  meta: {
    color: "#d0d0d0",
    fontSize: "14px",
  },
  reason: {
    fontSize: "14px",
    lineHeight: 1.5,
  },
};

export default PetCards;
