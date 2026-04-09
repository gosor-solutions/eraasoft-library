import { Loading } from "@/components/shared/Loading";
import { Pagination } from "@/components/shared/Pagination";
import { useGetBlogPosts } from "@/hooks/queries/useBlogQueries";
import { stripHtml } from "@/lib/utils";
import { FiCalendar, FiUser } from "react-icons/fi";
import { Link, useSearchParams } from "react-router";

export function BlogsPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const { data: response, isLoading } = useGetBlogPosts(page);

  if (isLoading) {
    return <Loading />;
  }

  console.log("response", response);


  const blogs = response?.data || [];
  const meta = response?.meta;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Blog Posts</h1>

        {blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No blog posts available yet.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blogs/${blog.id}`}
                className="flex flex-col md:flex-row bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="md:w-72 h-48 shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <FiUser size={14} />
                        {blog.writer_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-3">
                      {stripHtml(blog.body, 200)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {meta && meta.last_page > 1 && (
          <Pagination
            meta={{
              current_page: page,
              last_page: meta.last_page,
            }}
          />
        )}
      </div>
    </div>
  );
}