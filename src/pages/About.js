import React from 'react';

// --- Reusable Component for Statistics ---

const StatCard = ({ icon, number, description }) => (
    <div style={statStyles.card}>
        <div style={statStyles.iconPlaceholder}>{icon}</div>
        <h3 style={statStyles.number}>{number}</h3>
        <p style={statStyles.description}>{description}</p>
    </div>
);

// --- Placeholder Components for Abstract Illustrations (Kept for visual layout) ---

// Component for the Abstract Blob Illustration (Hero Section)
const HeroIllustration = () => (
    <div style={illustrationStyles.heroContainer}>
        {/* Blue Blob */}
        <div style={illustrationStyles.blobBlue}></div>
        {/* Yellow Scarf/Arm */}
        <div style={illustrationStyles.scarfYellow}></div>
        {/* Yellow Circle/Ring */}
        <div style={illustrationStyles.ringYellow}></div>
    </div>
);

// Component for the Abstract Car Illustration (Data Section)
const DataIllustration = () => (
    <div style={illustrationStyles.dataContainer}>
        {/* Placeholder for the white car image */}
        <div style={illustrationStyles.carPlaceholder}>
            <span style={illustrationStyles.carText}>🚗 Car Placeholder</span>
        </div>
        
        {/* Blue and Yellow Blobs */}
        <div style={illustrationStyles.blobBlueData}></div>
        <div style={illustrationStyles.blobYellowData}></div>

        {/* Green Price Tag */}
        <div style={illustrationStyles.priceTag}>$</div>
    </div>
);


// --- Main Component ---

const About = () => {
    return (
        <div style={pageStyles.container}>

            {/* --- 1. Hero Section --- */}
            <section style={sectionStyles.hero}>
                <div style={sectionStyles.heroContent}>
                    <h1 style={sectionStyles.heroTitle}>
                        Empowering people to choose smarter, drive better, and sell easier.
                    </h1>
                    <p style={sectionStyles.heroDescription}>
                        We’re redefining how people choose, maintain, and sell vehicles. Our team constantly pushes boundaries to deliver innovative tools and real-time automotive insights to your fingertips.
                    </p>
                </div>
                <HeroIllustration />
            </section>

            {/* --- 2. Data Expertise Section --- */}
            <section style={sectionStyles.dataExpertise}>
                <div style={sectionStyles.dataContent}>
                    <h2 style={sectionStyles.dataTitle}>
                        Leading the way in automotive data
                    </h2>
                    <p style={sectionStyles.dataDescription}>
                        Our car history reports are based on data from 900+ international databases belonging to national car registries, insurance companies, law enforcement agencies, official garages, and other institutions. Once we've gathered all the relevant information about a vehicle, we organize it and present it in an easy-to-understand...
                    </p>
                </div>
                <DataIllustration />
            </section>
            
            {/* --- 3. CarVertical in Numbers Section (NEW) --- */}
            <section style={sectionStyles.numbers}>
                <h2 style={sectionStyles.numbersTitle}>ETHIOVEHICLE TRACKER IN NUMBERS</h2>
                <div style={statStyles.grid}>
                    <StatCard icon="🚗" number="1000+" description="Cars checked" />
                    <StatCard icon="🧍" number="100 000+" description="Unique users per year" />
                    <StatCard icon="📊" number="50+" description="Data sources" />
                    <StatCard icon="💰" number="5,000,000" description="Revenue" />
                    <StatCard icon="🌍" number="35" description="Markets" />
                    <StatCard icon="🎮" number="40+" description="Employees and we're constantly hiring" />
                </div>
            </section>
        </div>
    );
};

// --- Styles ---

const TEXT_DARK = '#333333';
const TEXT_LIGHT = '#666666';
const ILLUSTRATION_BLUE = '#2954ff';
const ILLUSTRATION_YELLOW = '#ffc000';

const pageStyles = {
    container: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        minHeight: '100vh',
        backgroundColor: 'white',
        overflowX: 'hidden', 
    }
};

const sectionStyles = {
    hero: {
        background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)',       
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '100px 5% 100px 5%', 
        minHeight: '400px',
    },
    heroContent: {
        maxWidth: '500px',
    },
    heroTitle: {
        fontSize: '48px',
        fontWeight: '900',
        lineHeight: '1.2',
        color: TEXT_DARK,
        marginBottom: '20px',
    },
    heroDescription: {
        fontSize: '18px',
        lineHeight: '1.5',
        color: TEXT_LIGHT,
    },
    dataExpertise: {
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '100px 5% 80px 5%',
    },
    dataContent: {
        maxWidth: '500px',
    },
    dataTitle: {
        fontSize: '38px',
        fontWeight: '900',
        lineHeight: '1.2',
        color: TEXT_DARK,
        marginBottom: '20px',
    },
    dataDescription: {
        fontSize: '16px',
        lineHeight: '1.6',
        color: TEXT_LIGHT,
    },
    // NEW Styles for the Numbers Section
    numbers: {
        padding: '80px 5% 100px 5%',
        textAlign: 'center',
        backgroundColor: 'white',
    },
    numbersTitle: {
        fontSize: '38px',
        fontWeight: '900',
        color: TEXT_DARK,
        marginBottom: '60px',
    }
};

// NEW Styles for the Stat Cards and Grid
const statStyles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)', // 3 columns per row
        gap: '40px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
    },
    card: {
        padding: '20px',
        textAlign: 'center',
    },
    iconPlaceholder: {
        fontSize: '40px',
        marginBottom: '20px',
        // In the original, the icons are custom-drawn, I use emojis as a placeholder.
        // For actual icons, you'd use SVGs or an icon library here.
        // I will use colors similar to the image for better approximation.
        color: ILLUSTRATION_BLUE, // Default color, will be overridden by emoji/icon
    },
    number: {
        fontSize: '24px',
        fontWeight: '900',
        color: TEXT_DARK,
        margin: '10px 0',
    },
    description: {
        fontSize: '14px',
        color: TEXT_LIGHT,
    }
};

// Styles for the Placeholder Illustrations (Unchanged)
const illustrationStyles = {
    // --- Hero Illustration Styles ---
    heroContainer: {
        position: 'relative',
        width: '450px',
        height: '250px',
        transform: 'scale(1.1)', 
        marginRight: '50px',
    },
    blobBlue: {
        position: 'absolute',
        width: '80px',
        height: '200px',
        backgroundColor: ILLUSTRATION_BLUE,
        borderRadius: '40px',
        top: '20px',
        right: '100px',
    },
    scarfYellow: {
        position: 'absolute',
        width: '180px',
        height: '30px',
        backgroundColor: ILLUSTRATION_YELLOW,
        transform: 'rotate(-10deg)',
        top: '60px',
        right: '50px',
    },
    ringYellow: {
        position: 'absolute',
        width: '80px',
        height: '80px',
        border: `15px solid ${ILLUSTRATION_YELLOW}`,
        borderRadius: '50%',
        top: '40px',
        right: '0',
    },

    // --- Data Illustration Styles ---
    dataContainer: {
        position: 'relative',
        width: '500px',
        height: '300px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '20px',
    },
    carPlaceholder: {
        width: '350px',
        height: '150px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 5,
        marginBottom: '5px',
    },
    carText: {
        color: TEXT_DARK,
        fontWeight: '600',
    },
    blobBlueData: {
        position: 'absolute',
        width: '50px',
        height: '150px',
        backgroundColor: ILLUSTRATION_BLUE,
        borderRadius: '30px',
        right: '150px',
        top: '100px',
        zIndex: 6,
    },
    blobYellowData: {
        position: 'absolute',
        width: '50px',
        height: '150px',
        backgroundColor: ILLUSTRATION_YELLOW,
        borderRadius: '30px',
        right: '200px',
        top: '100px',
        zIndex: 6,
    },
    priceTag: {
        position: 'absolute',
        width: '70px',
        height: '70px',
        backgroundColor: '#4CAF50', // Green
        borderRadius: '50%',
        color: 'white',
        fontSize: '30px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        right: '80px',
        bottom: '120px',
        transform: 'rotate(-15deg)',
        zIndex: 7,
    }
};

export default About;