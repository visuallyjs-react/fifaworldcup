export default function Player({player}) {
    return <div style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "8px",
        margin: "4px",
        width: "200px",
        fontSize: "0.85rem",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    }}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "4px"}}>
            <span style={{fontWeight: "bold"}}>{player.name}</span>
            <span style={{color: "#666"}}>#{player.number}</span>
        </div>
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <span>{player.pos}</span>
            <span>{player.date_of_birth}</span>
        </div>
        <div style={{fontSize: "0.75rem", color: "#555", marginTop: "2px"}}>
            {player.club.name} ({player.club.country})
        </div>
    </div>
}
