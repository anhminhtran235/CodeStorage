using System.Collections.Generic;
using System.Threading.Tasks;
using CodeStorage.API.Models;

namespace CodeStorage.API.Data
{
    public interface ICodeStorageRepository
    {
        Task<IEnumerable<Document>> GetDocuments(int userId);
        Task<Document> GetDocument(int documentId);
        Task<Document> NewDocument(int userId);
        void RemoveAllEmptyDocuments();
        void UpdateDocument(Document document);
        Task<bool> SaveAll();
    }
}