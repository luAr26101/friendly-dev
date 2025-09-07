type PostFilterProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

function PostFilter({ searchQuery, onSearchChange }: PostFilterProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Search posts..."
      />
    </div>
  );
}

export default PostFilter;
