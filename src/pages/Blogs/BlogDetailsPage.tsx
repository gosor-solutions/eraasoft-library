import { Loading } from "@/components/shared/Loading";
import { useGetBlogPost, useGetRecentBlogPosts } from "@/hooks/queries/useBlogQueries";
import { FiArrowLeft, FiCalendar, FiUser } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router";

export function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const blogId = Number(id);

  const { data: blogResponse, isLoading: isBlogLoading } = useGetBlogPost(blogId);
  const { data: recentResponse } = useGetRecentBlogPosts(blogId);

  if (isBlogLoading) {
    return <Loading />;
  }

  const blog = blogResponse?.data;
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
          <Link to="/blogs" className="text-brand-primary hover:underline">
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  const recentBlogs = recentResponse?.data?.filter(b => b.id !== blogId).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-brand-primary mb-6 transition-colors"
        >
          <FiArrowLeft />
          Back
        </button>

        <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="w-full h-64 md:h-80">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-100">
              <span className="flex items-center gap-1">
                <FiUser size={14} />
                {blog.writer_name}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar size={14} />
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>

            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.body }}
            />
          </div>
        </article>

        {recentBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.id}
                  to={`/blogs/${relatedBlog.id}`}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-40">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(relatedBlog.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}