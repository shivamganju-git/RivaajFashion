import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';

const ProductsManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    stock: 0,
    image_url: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images ( image_url )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (error) {
      alert('Error uploading image!');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert Product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert([{
          title: formData.title,
          price: parseFloat(formData.price),
          description: formData.description,
          stock: parseInt(formData.stock)
        }])
        .select()
        .single();

      if (productError) throw productError;

      // Insert Image if exists
      if (formData.image_url) {
        const { error: imageError } = await supabase
          .from('product_images')
          .insert([{
            product_id: productData.id,
            image_url: formData.image_url,
            is_main: true
          }]);
          
        if (imageError) throw imageError;
      }

      setIsModalOpen(false);
      setFormData({ title: '', price: '', description: '', stock: 0, image_url: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        alert('Failed to delete product');
      } else {
        fetchProducts();
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Products Inventory</h2>
          <p className="text-gray-500 mt-1">Manage your storefront kurtis and stock.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-md font-medium hover:bg-accent-light transition-colors"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">Loading products...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Product</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Stock</th>
                <th className="p-4 font-semibold text-gray-600">Date Added</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No products found. Add your first kurti to get started!
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center gap-4">
                      <div className="w-12 h-16 bg-gray-100 rounded object-cover overflow-hidden">
                        {product.product_images?.[0]?.image_url ? (
                          <img src={product.product_images[0].image_url} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><ImageIcon size={20} /></div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{product.title}</span>
                    </td>
                    <td className="p-4 font-medium text-gray-800">₹{product.price}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(product.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-800">Add New Kurti</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <Trash2 size={24} className="opacity-0 hidden" /> {/* Spacer */}
                <span className="text-2xl leading-none">&times;</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 border rounded-md outline-none focus:border-accent" placeholder="e.g. Evara Bell Sleeves Kurti" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 border rounded-md outline-none focus:border-accent" placeholder="899" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Initial Stock</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-3 border rounded-md outline-none focus:border-accent" placeholder="50" />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded-md outline-none focus:border-accent" placeholder="Premium cotton kurti perfect for office wear..."></textarea>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Main Product Photo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                    {formData.image_url ? (
                      <div className="relative inline-block">
                        <img src={formData.image_url} alt="Preview" className="h-40 object-cover rounded" />
                        <button type="button" onClick={() => setFormData({...formData, image_url: ''})} className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1"><Trash2 size={16}/></button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={32} className="mx-auto text-gray-400 mb-3" />
                        <label className="cursor-pointer bg-white px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                          {uploading ? 'Uploading...' : 'Upload Image'}
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                        </label>
                        <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 border rounded-md font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" disabled={uploading} className="px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-light">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;
