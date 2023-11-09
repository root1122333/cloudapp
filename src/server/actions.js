import HttpError from '@wasp/core/HttpError.js'

export const uploadFile = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { name, fileType, content } = args;

  const uploadTime = new Date();
  const expiryTime = new Date();
  expiryTime.setHours(expiryTime.getHours() + 12);

  const newFile = await context.entities.File.create({
    data: {
      name,
      fileType,
      content,
      uploadTime,
      expiryTime,
      userId: context.user.id
    }
  });

  return newFile;
}

export const deleteExpiredFiles = async (args, context) => {
  const expiredFiles = await context.entities.File.findMany({
    where: {
      expiryTime: { lt: new Date() }
    }
  });

  for (const file of expiredFiles) {
    await context.entities.File.delete({ where: { id: file.id } });
  }
}