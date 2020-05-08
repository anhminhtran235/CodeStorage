namespace CodeStorage.API.Models
{
    public class Document
    {
        public Document(int userId)
        {
            this.Title = "";
            this.Content = "";
            this.UserId = userId;
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
    }
}