import type { ApiResponse } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/queryKeys";
import { apiService } from "../../services/apiService";
import type { BlogPost } from "../../types/blog";

export const useGetBlogPosts = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.list(page),
    queryFn: () =>
      apiService.get<ApiResponse<Array<BlogPost>>>("/blog-posts", {
        page,
      }),
  });
};

export const useGetBlogPost = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.detail(id),
    queryFn: () =>
      apiService.get<ApiResponse<BlogPost>>(`/blog-posts/${id}`),
  });
};

export const useGetRecentBlogPosts = (excludeId?: number, limit: number = 3) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.blogs.all(), "recent", excludeId],
    queryFn: () =>
      apiService.get<ApiResponse<Array<BlogPost>>>("/blog-posts", {
        page: 1,
        limit,
      }),
  });
};