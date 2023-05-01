import { ResponsiveLine } from "@nivo/line";
import "./ChartComponent.scss";
import { format } from "date-fns";

// props have props.type, props.data, props.name
const ChartComponent = (props) => {
  const formattedData = [
    {
      id: "balance",
      data:
        props.display === "dashboard"
          ? props.data.map(({ hour, balance }) => ({
              x: hour,
              y: balance,
            }))
          : props.data.map(({ date, balance }) => ({
              x: date,
              y: balance,
            })),
    },
  ];

  // format the y-axis balance type
  // const formatBalance = (value) => `$${value.toFixed(2)}`;
  const timeZoneOffset = 1 * 60 * 60 * 1000; // 4 hours offset for EST

  return (
    <div className="chartClass">
      <div className="card">
        <div className="card-body chart-body">
          <h4 className="card-title mb-4">{props.name}</h4>
          <hr className="my-4" />
          <div className="chart">
            <ResponsiveLine
              data={formattedData}
              margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
              xScale={
                props.display === "dashboard"
                  ? {
                      type: "time",
                      format: "%H-%M",
                      useUTC: false, // set to false to use the local timezone
                      timezone: "America/New_York", // set to EST timezone
                    }
                  : {
                      type: "time",
                      format: "%Y-%m-%d",
                      useUTC: false, // set to false to use the local timezone
                      timezone: `-${timeZoneOffset / (60 * 1000)}`,
                    }
              } // updated format
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              axisBottom={
                props.display === "dashboard"
                  ? {
                      format: "%I:%M %p", // format time in 12-hour format
                      legendOffset: 36,
                      tickValues: 5,
                    }
                  : {
                      format: "%b %d",
                      tickValues: "everyday",
                      legendOffset: 36,
                    }
              }
              axisLeft={
                null
                //   {
                //   format: formatBalance,
                //   tickPadding: 5,
                //   tickRotation: 0,
                //   legendOffset: -60,
                //   legendPosition: "middle",
                //   tickValues: 5, // set maximum number of ticks to 10
                // }
              }
              enableGridY={false}
              enablePoints={false}
              useMesh={true}
              tooltip={({ point, data }) => {
                const formatBalance = (balance) =>
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                  }).format(balance);

                const currentBalance = point.data.y;
                const previousBalance = 10000;
                const percentChange =
                  ((currentBalance - previousBalance) / previousBalance) * 100;
                const percentChangeFormatted = percentChange.toFixed(1);

                const percentChangeColor = percentChange > 0 ? "green" : "red";

                return (
                  <div
                    style={{
                      background: "#fff",
                      padding: "9px 12px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>
                      {props.display === "dashboard"
                        ? format(new Date(point.data.x), "p")
                        : format(new Date(point.data.x), "MMM d, yyyy")}
                    </div>
                    <div>{formatBalance(point.data.y)}</div>
                    <div style={{ color: percentChangeColor }}>
                      {percentChangeFormatted}%{" "}
                      <i
                        className={
                          percentChange > 0
                            ? "bi bi-caret-up-fill me-1"
                            : "bi bi-caret-down-fill me-1"
                        }
                      ></i>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChartComponent;
