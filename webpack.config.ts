import path from "path";
import { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const isProduction = process.env.NODE_ENV === "production";

const configuration: Configuration = {
  target: "node",
  entry: {
    app: {
      import: "./app/index.ts",
    },
    ssg: {
      import: "./renderer/ssg.tsx",
      dependOn: ["app"],
    },
    ssr: {
      import: "./renderer/ssr.tsx",
      dependOn: ["app"],
    },
  },
  externalsPresets: { node: true },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, ".public"),
    publicPath: "/",
  },
  devtool: isProduction ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets/images",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

export default {
  ...configuration,
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: path.join(__dirname, "public"),
  //   compress: true,
  //   port: 3000,
  // },
};
