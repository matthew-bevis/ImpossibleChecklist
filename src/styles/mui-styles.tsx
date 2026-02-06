const classes = {
    mainContainer: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
    },
    titleText: {
        fontSize: '3rem',
        fontWeight: 'bold',
    },
    titleContainer: {
        marginTop: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  
    },
    categoryContainer: {
        width: '100%',
    },
    categoryHeader: {
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        width: '100%',
    },
    categoryText: {
        fontSize: '2rem',
        fontWeight: '600',
        textAlign: 'left',
    },
    listContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',   
        alignItems: 'center',
    },
    listText: {
        fontSize: '1.5rem',
        textAlign: 'left',
    },
    completedItemText: {
        fontSize: '1.5rem',
        textAlign: 'left',
        textDecoration: 'line-through',
        fontStyle: 'italic',
        opacity: 0.6,
    },
    categoryButton: {
        marginTop: '1rem',
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#115293',
        },
    },
    addCategoryButtonContainer: {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 10,
    },
    categoryPaper: {
        padding: '1rem',
        marginBottom: '1rem',
        width: '100%',
    },
    itemButtonBox: {
        display: 'flex',
        marginLeft: 'auto',
    },
    popupWindow: {
        width: '75vw',
        height: 'auto',
    },
};

export default classes;