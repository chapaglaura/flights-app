module.exports = (mongoose) => {
  let schema = mongoose.Schema(
    {
      number: String,
      lastName: String,
      ship: String,
      sailDate: {
        month: String,
        day: Number,
        year: Number,
      },
      rememberInfo: Boolean,
    },
    { timestamps: true }
  );

  const Reservation = mongoose.model("reservation", schema);

  return Reservation;
};
