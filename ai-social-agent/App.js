// Initialize Supabase
const SUPABASE_URL = "https://YOUR_PROJECT_URL.supabase.co";
const SUPABASE_KEY = "YOUR_ANON_PUBLIC_KEY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch posts from Supabase
  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("test_posts")
      .select("*")
      .order("id", { ascending: false });
    setLoading(false);

    if (error) {
      console.error("Error fetching posts:", error);
      alert("Could not load posts!");
    } else {
      setPosts(data);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>AI Social Agent</h2>
      <button onClick={fetchPosts}>Refresh Posts</button>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
