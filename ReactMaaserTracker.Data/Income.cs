using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactMaaserTracker.Data
{
    public class Income
    {
        public int Id { get; set; }
        public Source Source { get; set; }
        public int SourceId { get; set; } 
        public decimal Amount { get; set; }
        public DateTime DateReceived { get; set; }
    }
}
