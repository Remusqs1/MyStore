const boom = require("@hapi/boom")

function dtoValidatorHandler(dto, prop) {
  return (req, res, next) => {
    const data = req[prop]
    const { error } = dto.validate(data, {abortEarly : false})

    if(error){
      next(boom.badRequest(error))
    }
    next();
  }
}

module.exports = dtoValidatorHandler
