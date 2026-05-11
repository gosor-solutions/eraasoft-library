import { Button } from "@/components/shared/button";
import { Loading } from "@/components/shared/Loading";
import { useGetBlogPosts } from "@/hooks/queries/useBlogQueries";
import { stripHtml } from "@/lib/utils";
import { FiCalendar, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router";

export function BlogSection() {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetBlogPosts(1);

  if (isLoading) {
    return <Loading size={40} color="#000000" />;
  }

  const blogs = response?.data?.slice(0, 3) || [];

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Latest Blogs
          </h2>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto">
            Stay updated with our latest news, articles, and educational tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => navigate(`/blogs/${blog.id}`)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FiUser size={14} className="text-brand-primary" />
                    {blog.writer_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCalendar size={14} className="text-brand-primary" />
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-brand-gray text-sm mb-4 line-clamp-3">
                  {stripHtml(blog.body, 150)}
                </p>
                <div className="text-brand-primary font-semibold text-sm flex items-center gap-1">
                  Read More <span>&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            onClick={() => navigate("/blogs")}
            className="text-lg px-8 py-6 rounded-xl font-medium"
          >
            Show More Blogs
          </Button>
        </div>
      </div>
    </section>
  );
}
