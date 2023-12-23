const asyncHandler = (requestHandle) => {
  (req, res, next) => {
    Promise.resolve(requestHandle(req, res, next)).catch((err) => {
      console.log(err);
      next(err);
    });
  };
};
export { asyncHandler };
// higher order function
// const asyncHandler =()=>{}
// const asyncHandler =(func) =>() =>{}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = async () => async (req, res, next) => {
//   try {
//     await fn(req, res, next)
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: true,
//       message: error.message,
//     });
//   }
// };
