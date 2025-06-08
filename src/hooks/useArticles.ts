
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { articleService, Article } from '../services/articleService'
import { useToast } from '@/hooks/use-toast'

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: articleService.getPublishedArticles,
  })
}

export const useArticlesByCategory = (category: string) => {
  return useQuery({
    queryKey: ['articles', 'category', category],
    queryFn: () => articleService.getArticlesByCategory(category),
  })
}

export const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['articles', 'slug', slug],
    queryFn: () => articleService.getArticleBySlug(slug),
    enabled: !!slug,
  })
}

export const useFeaturedArticles = () => {
  return useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: articleService.getFeaturedArticles,
  })
}

// Admin hooks
export const useAllArticles = () => {
  return useQuery({
    queryKey: ['articles', 'all'],
    queryFn: articleService.getAllArticles,
  })
}

export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: articleService.createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast({
        title: 'Success',
        description: 'Article created successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create article',
        variant: 'destructive',
      })
    },
  })
}

export const useUpdateArticle = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Article> }) =>
      articleService.updateArticle(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update article',
        variant: 'destructive',
      })
    },
  })
}

export const useDeleteArticle = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: articleService.deleteArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      })
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete article',
        variant: 'destructive',
      })
    },
  })
}
