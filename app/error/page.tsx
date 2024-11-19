export default function ErrorPage() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Authentication Error</h1>
            <p>Something went wrong. Please try again.</p>
            <a href="/login">Back to Login</a>
        </div>
    );
}