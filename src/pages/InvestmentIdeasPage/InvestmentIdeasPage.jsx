import React, { useEffect, useState } from "react";
import "../InvestmentIdeasPage/InvestmentIdeasPage.scss";

function InvestmentIdeasPage() {
  const [investmentIdeas, setInvestmentIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Mock data for testing purposes
    const mockInvestmentIdeas = [
      {
        stockTicker: "AAPL",
        stockName: "Apple Inc.",
        stockPrice: "$150",
        position: "Long",
        oneMonthChange: "+2.5%",
        threeMonthChange: "+10%",
        oneYearChange: "+20%",
        marketCap: "$2.5T",
        peRatio: "28.5",
        pegRatio: "1.5",
        priceToSales: "6.5",
        priceToBook: "8.3",
        evRevenue: "7.0",
        evEbitda: "18.3",
      },
      {
        stockTicker: "GOOGL",
        stockName: "Alphabet Inc.",
        stockPrice: "$2800",
        position: "Short",
        oneMonthChange: "-1.5%",
        threeMonthChange: "+5%",
        oneYearChange: "+15%",
        marketCap: "$1.8T",
        peRatio: "30.2",
        pegRatio: "1.8",
        priceToSales: "8.2",
        priceToBook: "5.7",
        evRevenue: "8.5",
        evEbitda: "20.4",
      },
      {
        stockTicker: "AMZN",
        stockName: "Amazon.com Inc.",
        stockPrice: "$3450",
        position: "Long",
        oneMonthChange: "+3.1%",
        threeMonthChange: "+12%",
        oneYearChange: "+18%",
        marketCap: "$1.7T",
        peRatio: "60.1",
        pegRatio: "2.0",
        priceToSales: "4.2",
        priceToBook: "15.3",
        evRevenue: "3.9",
        evEbitda: "21.1",
      },
      {
        stockTicker: "MSFT",
        stockName: "Microsoft Corporation",
        stockPrice: "$299",
        position: "Long",
        oneMonthChange: "+4.5%",
        threeMonthChange: "+8%",
        oneYearChange: "+22%",
        marketCap: "$2.4T",
        peRatio: "35.6",
        pegRatio: "2.3",
        priceToSales: "10.5",
        priceToBook: "14.7",
        evRevenue: "9.4",
        evEbitda: "24.2",
      },
      {
        stockTicker: "TSLA",
        stockName: "Tesla Inc.",
        stockPrice: "$1100",
        position: "Short",
        oneMonthChange: "-3.4%",
        threeMonthChange: "+20%",
        oneYearChange: "+35%",
        marketCap: "$1.0T",
        peRatio: "300.4",
        pegRatio: "1.7",
        priceToSales: "20.2",
        priceToBook: "35.3",
        evRevenue: "19.2",
        evEbitda: "38.7",
      },
      {
        stockTicker: "FB",
        stockName: "Meta Platforms Inc.",
        stockPrice: "$340",
        position: "Long",
        oneMonthChange: "+2.1%",
        threeMonthChange: "+7%",
        oneYearChange: "+12%",
        marketCap: "$950B",
        peRatio: "23.9",
        pegRatio: "1.4",
        priceToSales: "7.8",
        priceToBook: "6.3",
        evRevenue: "7.5",
        evEbitda: "18.0",
      },
      {
        stockTicker: "NFLX",
        stockName: "Netflix Inc.",
        stockPrice: "$590",
        position: "Long",
        oneMonthChange: "+1.8%",
        threeMonthChange: "+6%",
        oneYearChange: "+10%",
        marketCap: "$270B",
        peRatio: "55.8",
        pegRatio: "2.1",
        priceToSales: "9.2",
        priceToBook: "18.6",
        evRevenue: "8.9",
        evEbitda: "25.7",
      },
      {
        stockTicker: "NVDA",
        stockName: "NVIDIA Corporation",
        stockPrice: "$220",
        position: "Long",
        oneMonthChange: "+5.5%",
        threeMonthChange: "+18%",
        oneYearChange: "+45%",
        marketCap: "$550B",
        peRatio: "70.3",
        pegRatio: "2.5",
        priceToSales: "20.4",
        priceToBook: "19.3",
        evRevenue: "18.9",
        evEbitda: "40.0",
      },
      {
        stockTicker: "BABA",
        stockName: "Alibaba Group",
        stockPrice: "$150",
        position: "Short",
        oneMonthChange: "-4.2%",
        threeMonthChange: "-8%",
        oneYearChange: "-20%",
        marketCap: "$400B",
        peRatio: "19.4",
        pegRatio: "1.1",
        priceToSales: "5.5",
        priceToBook: "3.8",
        evRevenue: "4.2",
        evEbitda: "12.0",
      },
      {
        stockTicker: "JPM",
        stockName: "JPMorgan Chase & Co.",
        stockPrice: "$160",
        position: "Long",
        oneMonthChange: "+2.7%",
        threeMonthChange: "+4%",
        oneYearChange: "+8%",
        marketCap: "$490B",
        peRatio: "12.5",
        pegRatio: "1.3",
        priceToSales: "4.1",
        priceToBook: "1.9",
        evRevenue: "3.8",
        evEbitda: "10.5",
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setInvestmentIdeas(mockInvestmentIdeas);
      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  }, []);

  // Function to handle adding an idea to the portfolio
  const handleAddToPortfolio = (idea) => {
    console.log("Adding to portfolio:", idea);
    alert(
      `Investment idea for ${idea.stockName} has been added to the portfolio.`
    );
  };

  // Function to handle replacing an idea
  const handleReplaceIdea = (index) => {
    console.log(`Replacing idea at index ${index}`);
    alert(`Replaced idea at index ${index}`);
  };

  return (
    <div className="investment-ideas-page">
      <h2>Investment Ideas</h2>

      {isLoading && (
        <p>Loading investment ideas... This might take up to 1 minute.</p>
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && investmentIdeas.length > 0 && (
        <div className="investment-ideas-table">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Stock Ticker</th>
                <th>Stock Name</th>
                <th>Stock Price</th>
                <th>Position (Long/Short)</th>
                <th>1M Price Change</th>
                <th>3M Price Change</th>
                <th>1Y Price Change</th>
                <th>Market Cap</th>
                <th>P/E</th>
                <th>PEG</th>
                <th>Price to Sales</th>
                <th>Price to Book</th>
                <th>EV/Revenue</th>
                <th>EV/EBITDA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {investmentIdeas.map((idea, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{idea.stockTicker}</td>
                  <td>{idea.stockName}</td>
                  <td>{idea.stockPrice}</td>
                  <td>{idea.position}</td>
                  <td>{idea.oneMonthChange}</td>
                  <td>{idea.threeMonthChange}</td>
                  <td>{idea.oneYearChange}</td>
                  <td>{idea.marketCap}</td>
                  <td>{idea.peRatio}</td>
                  <td>{idea.pegRatio}</td>
                  <td>{idea.priceToSales}</td>
                  <td>{idea.priceToBook}</td>
                  <td>{idea.evRevenue}</td>
                  <td>{idea.evEbitda}</td>
                  <td>
                    <button onClick={() => handleAddToPortfolio(idea)}>
                      Add to Portfolio
                    </button>
                    <button onClick={() => handleReplaceIdea(index)}>
                      Replace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InvestmentIdeasPage;
