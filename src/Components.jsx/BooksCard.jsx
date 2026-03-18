import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faBookOpen, faEye, faDownload } from "@fortawesome/free-solid-svg-icons"

export const BooksCard = ({ book }) => {
    if (!book) return null;

    const handleView = () => {
        if (!book.file_url) {
            alert('File URL not available');
            return;
        }
        
        const fileType = book.file_type?.toLowerCase() || '';
        
        // Check if file is viewable in browser (PDF, images)
        if (fileType === 'pdf' || fileType === 'image') {
            window.open(book.file_url, '_blank');
        } else {
            // For non-viewable files (Word, PowerPoint, etc), download instead
            alert('This file type cannot be viewed in browser. Downloading instead...');
            handleDownload();
        }
    };

    const handleDownload = async () => {
        if (!book.file_url) {
            alert('File URL not available');
            return;
        }
        try {
            // Fetch the file from the URL
            const response = await fetch(book.file_url);
            if (!response.ok) throw new Error('Failed to download file');
            
            // Get the file blob
            const blob = await response.blob();
            
            // Create a temporary URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);
            
            // Extract just the original filename from file_name (remove timestamp)
            let downloadName = book.file_name || 'file';
            // Remove the timestamp prefix (e.g., "1234567890-filename.ext" -> "filename.ext")
            downloadName = downloadName.replace(/^\d+-/, '');
            
            // Create temporary anchor element
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = downloadName;
            link.style.display = 'none';
            document.body.appendChild(link);
            
            // Trigger the download
            link.click();
            
            // Clean up after download completes (with longer delay)
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
            }, 500);
        } catch (error) {
            console.error('Download error:', error);
            alert('Failed to download file');
        }
    };

    const getFileType = (fileName) => {
        return fileName?.split('.').pop()?.toUpperCase() || 'FILE';
    };

    return(
        <div className="books-card">
            <div className="bg-chem-cyan/10 border border-chem-cyan/10 p-3 rounded-lg flex w-full">
                <FontAwesomeIcon icon={faNewspaper} className="text-chem-cyan bg-chem-cyan/10 p-2 rounded-lg mr-2 h-5" />
                <div>
                    <div className="flex justify-between">
                        <h1 className="text-white font-bold">{book.course_title}</h1>
                        <p className="text-chem-cyan font-bold border border-chem-cyan rounded-lg px-2 h-6">{getFileType(book.file_name)}</p>
                    </div>

                    <div className="flex space-x-2 mt-2">
                        <p className="bg-chem-green px-2 rounded-lg">{book.author}</p>
                        <p className="bg-chem-green px-2 rounded-lg">{book.course_code}</p>
                    </div>

                    <div className="flex space-x-2 mt-2 text-gray-400">
                        <FontAwesomeIcon icon={faBookOpen} className="my-1" />
                        <p>{book.category}</p>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={handleView} className="flex space-x-3 bg-chem-cyan py-2 px-3 w-fit h-10 rounded-lg hover:text-white">
                            <FontAwesomeIcon icon={faEye} className="my-1" />
                            <p>View</p>
                        </button>
                        <button onClick={handleDownload} className="flex space-x-3 border border-chem-cyan/10 hover:border-chem-cyan text-white py-2 px-3 w-fit h-10 rounded-lg">
                            <FontAwesomeIcon icon={faDownload} className="my-1" />
                            <p>Download</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}