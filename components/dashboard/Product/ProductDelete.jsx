import { Trash2 } from 'lucide-react'
import { useDeleteProductMutation } from '@/lib/features/Product/productApi'
import { Button } from '@/components/ui/button'

function ProductDelete({productId}) {
  const [deleteProduct, { isLoading }] = useDeleteProductMutation()

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            disabled={isLoading}
            onClick={() => deleteProduct(productId)} 
            className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
            <Trash2 className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
        </Button>
    )
}
export default ProductDelete
