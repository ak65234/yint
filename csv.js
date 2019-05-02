let CSV = function () {
    let json = {};

    this.parse = function (txt, start, end) {
        if (typeof start === "undefined") start = 0;
        if (typeof end === "undefined") end = -1;

        json = {};
        let headers = [];
        let col = 0;
        let cols = 0;
        let rows = -1;
        let str = "";
        let isInQuote = false;

        for (i = 0; i < txt.length; i++) {
            if (txt[i] === '"')
                isInQuote = !isInQuote;

            if (txt[i] !== ',' && txt[i] !== '\n' || isInQuote)
                str += txt[i];

            if ((txt[i] === ',' || txt[i] === '\n') && !isInQuote || i == txt.length - 1) {
                if (cols === 0 || rows >= start)
                    str = str.trim().replace(/&/g, "&amp;").replace(/""/g, "&quot;").replace(/"/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, '&');

                if (cols === 0) {
                    headers.push(str);
                    json[str] = [];
                } else if (rows >= start) {
                    json[headers[col++]].push(str);
                }

                str = "";

                if (txt[i] === '\n' || i === txt.length - 1) {
                    cols = headers.length - 1;
                    col = 0;
                    rows++;

                    if (end >= 0 && rows === end)
                        break;
                }
            }
        }

        json.length = rows;

        return this;
    };

    this.toJSON = function () {
        return json;
    };

    return this;
};
