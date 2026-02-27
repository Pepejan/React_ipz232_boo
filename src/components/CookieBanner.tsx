import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie-consent";

type ConsentStatus = "accepted" | "declined" | null;

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem(CONSENT_KEY) as ConsentStatus;
        if (!saved) {
            // Small delay so the game loads first
            setTimeout(() => setVisible(true), 800);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, "accepted");
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem(CONSENT_KEY, "declined");
        // Remove game data on decline (respect user choice)
        localStorage.removeItem("emoji-match-settings");
        localStorage.removeItem("emoji-match-user");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.banner}>
                <div style={styles.header}>
                    <span style={styles.icon}>🍪</span>
                    <h3 style={styles.title}>Cookie & Storage Notice</h3>
                </div>

                <p style={styles.text}>
                    We use <strong>browser localStorage</strong> (not traditional cookies) to save your
                    game preferences, profile, and game history — all stored{" "}
                    <strong>locally on your device only</strong>. No data is sent to any server.
                </p>

                {showDetails && (
                    <div style={styles.details}>
                        <p style={styles.detailsTitle}>What we store:</p>
                        <ul style={styles.list}>
                            <li>
                                <strong>emoji-match-settings</strong> – Your game preferences (pairs count,
                                flip speed, theme). <em>Functional — required for the game.</em>
                            </li>
                            <li>
                                <strong>emoji-match-user</strong> – Your name and game history.{" "}
                                <em>Functional — required for the profile page.</em>
                            </li>
                        </ul>
                        <p style={styles.gdprNote}>
                            You have the right to access, export, or delete this data at any time via
                            your browser's DevTools (Application → Local Storage). See our{" "}
                            <a
                                href="PRIVACY_POLICY.md"
                                target="_blank"
                                rel="noreferrer"
                                style={styles.link}
                            >
                                Privacy Policy
                            </a>{" "}
                            for full details.
                        </p>
                    </div>
                )}

                <button
                    style={styles.detailsToggle}
                    onClick={() => setShowDetails((p) => !p)}
                >
                    {showDetails ? "▲ Hide details" : "▼ Show details"}
                </button>

                <div style={styles.buttons}>
                    <button style={styles.btnDecline} onClick={handleDecline}>
                        Decline
                    </button>
                    <button style={styles.btnAccept} onClick={handleAccept}>
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0 16px 16px",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
    },
    banner: {
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px 24px",
        maxWidth: "640px",
        width: "100%",
        boxShadow: "0 -2px 20px rgba(0,0,0,0.12)",
    },
    header: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "10px",
    },
    icon: { fontSize: "24px" },
    title: {
        fontSize: "16px",
        fontWeight: 700,
        color: "#222",
        margin: 0,
    },
    text: {
        fontSize: "13px",
        color: "#444",
        lineHeight: 1.6,
        marginBottom: "10px",
    },
    details: {
        background: "#f8f9fa",
        border: "1px solid #eee",
        borderRadius: "6px",
        padding: "12px",
        marginBottom: "10px",
        fontSize: "12px",
        color: "#444",
    },
    detailsTitle: {
        fontWeight: 600,
        marginBottom: "6px",
        color: "#222",
    },
    list: {
        paddingLeft: "16px",
        marginBottom: "8px",
        lineHeight: 1.8,
    },
    gdprNote: {
        color: "#666",
        marginTop: "6px",
    },
    link: { color: "#667eea" },
    detailsToggle: {
        background: "none",
        border: "none",
        color: "#667eea",
        fontSize: "12px",
        cursor: "pointer",
        padding: 0,
        marginBottom: "14px",
        display: "block",
    },
    buttons: {
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
    },
    btnDecline: {
        padding: "8px 20px",
        fontSize: "13px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "#fff",
        color: "#555",
        cursor: "pointer",
        fontWeight: 600,
    },
    btnAccept: {
        padding: "8px 20px",
        fontSize: "13px",
        borderRadius: "6px",
        border: "1px solid #667eea",
        background: "#667eea",
        color: "#fff",
        cursor: "pointer",
        fontWeight: 600,
    },
};