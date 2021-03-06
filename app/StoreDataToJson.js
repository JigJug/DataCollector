"use strict";
//binance changed their policy on who has acces to api data so need to find something better
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreDataJson = void 0;
/*
This is a class which retrieves data from binance api (market data such as price and candle data) and can store the data to JSON file

This can be used in a umber of ways for example:
  - a script to collect daily candles over a period of up to 500 days weeks or months, thi data can be then used or updated to a database.
  - a script to collect minute to daily chart updates or prices for a trading bot.

StoreDataJason accepts 3 params: ticker, interval and limit
  - ticker is the pairing eg. BTCUSDT
  - interval time interval eg 1m 4h 1d
  - limit is the number of data points returned when making candle data requests max: 500

Methods:
  Price: gets current market price of ticker. Max requests 100 per second?
  getCandles: returns candles according to the params
  stores the candle data to local JSON file
*/
var binance_api_node_1 = __importDefault(require("binance-api-node"));
var fs = require('fs');
var client = binance_api_node_1.default();
var StoreDataJson = /** @class */ (function () {
    function StoreDataJson(ticker, interval, limit) {
        this.ticker = ticker;
        this.interval = interval;
        this.limit = limit;
    }
    StoreDataJson.prototype.getCandles = function () {
        var params = {
            symbol: this.ticker,
            interval: this.interval,
            limit: this.limit
        };
        function candleData(params) {
            return new Promise(function (resolve, reject) {
                client.candles(params).then(function (data) {
                    resolve(data);
                }).catch(function (error) { reject(new Error(error)); });
            });
        }
        return candleData(params);
    };
    StoreDataJson.prototype.storeToJson = function (data) {
        var inte = this.interval;
        var tick = this.ticker;
        var fileName = "" + tick + inte + ".json";
        function storeToJSON(data) {
            data = JSON.stringify(data, null, 2);
            fs.writeFile(fileName, data, function (err) {
                if (err)
                    throw err;
                console.log('Data written to file');
            });
        }
        return storeToJSON(data);
    };
    return StoreDataJson;
}());
exports.StoreDataJson = StoreDataJson;
