// Initialize Supabase
const SUPABASE_URL = "https://gksvudeydddtdclztzuq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrc3Z1ZGV5ZGRkdGRjbHp0enVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MzkwNDcsImV4cCI6MjA3NzMxNTA0N30.TpIhZ0wN-dWL4Pp5g_mmnvYY4kwBq9uoxeWpCJ_oBzs";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function App() {
  const [posts, setPosts] = React.useState([]);
  const [newTitle, setNewTitle] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("test_posts")
      .select("*")
      .order("id", { ascending: false });
    setLoading(false);
    if (error) console.error(error);
    else setPosts(data);
  }

  async function addPost() {
    if (!newTitle.trim()) return alert("Please enter a post title");

    const { error } = await supabase.from("test_posts").insert([{ title: newTitle }]);
    if (error) {
      console.error(error);
      alert("Error adding post — check Supabase policies!");
    } else {
      alert("Post added successfully!");
      setNewTitle("");
      fetchPosts();
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h2>AI Social Agent</h2>

      <div className="new-post">
        <input
          type="text"
          placeholder="Write a new post..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button onClick={addPost}>Add Post</button>
      </div>

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
