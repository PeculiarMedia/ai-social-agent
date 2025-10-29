// Initialize Supabase
const SUPABASE_URL = "https://gksvudeydddtdclztzuq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrc3Z1ZGV5ZGRkdGRjbHp0enVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzkwNDcsImV4cCI6MjA3NzMxNTA0N30.TpIhZ0wN-dWL4Pp5g_mmnvYY4kwBq9uoxeWpCJ_oBzs";
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

