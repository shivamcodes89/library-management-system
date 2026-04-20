class APIFeatures {
  constructor(query, queryStr) {
    this.query    = query;
    this.queryStr = queryStr;
  }

  search(fields = ["title"]) {
    if (this.queryStr.keyword) {
      const or = fields.map((f) => ({
        [f]: { $regex: this.queryStr.keyword, $options: "i" },
      }));
      this.query = this.query.find({ $or: or });
    }
    return this;
  }

  filter() {
    const q = { ...this.queryStr };
    ["keyword", "page", "limit", "sort"].forEach((k) => delete q[k]);
    this.query = this.query.find(q);
    return this;
  }

  sort() {
    this.query = this.queryStr.sort
      ? this.query.sort(this.queryStr.sort.split(",").join(" "))
      : this.query.sort("-createdAt");
    return this;
  }

  paginate(def = 10) {
    const page  = parseInt(this.queryStr.page)  || 1;
    const limit = parseInt(this.queryStr.limit) || def;
    this.query  = this.query.skip((page - 1) * limit).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;