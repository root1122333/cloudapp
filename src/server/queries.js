import HttpError from '@wasp/core/HttpError.js'

export const getUserFiles = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const currentTime = new Date();

  return context.entities.File.findMany({
    where: {
      userId: context.user.id,
      expiryTime: { gt: currentTime }
    }
  });
}

export const uploadFile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const { name, fileType } = args;

  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 12);

  return context.entities.File.create({
    data: {
      name,
      fileType,
      uploadTime: new Date(),
      expiryTime,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const deleteExpiredFiles = async (args, context) => {
  const currentTime = new Date();

  return context.entities.File.deleteMany({
    where: {
      expiryTime: { lt: currentTime }
    }
  });
}