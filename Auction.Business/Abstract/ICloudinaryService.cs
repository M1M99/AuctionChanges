using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auction.Business.Abstract
{
    public interface ICloudinaryService
    {
        Task<string> UploadVideoAsync(Stream videoStream, string fileName);
        Task<string> UploadImageAsync(Stream imageStream, string fileName);
    }
}
