import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CategoryFilterProps {
  category: string | null
  setCategory: (category: string | null) => void
}

export function CategoryFilter({ category, setCategory }: CategoryFilterProps) {
  return (
    <Select 
      value={category || 'all'} 
      onValueChange={(value) => setCategory(value === 'all' ? null : value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        <SelectItem value="Tech">Technology</SelectItem>
        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
        <SelectItem value="Productivity">Productivity</SelectItem>
        <SelectItem value="Health">Health</SelectItem>
      </SelectContent>
    </Select>
  )
}

