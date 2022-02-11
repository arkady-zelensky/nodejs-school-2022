const storage = {
  items: [],
  categories: [],
  users: [],
};

const CHUNK_SIZE = 65;

class ItemsRepository {
  async insert(entities) {
    if (entities.length > CHUNK_SIZE) {
      throw new Error('Too large data portion');
    }
    // saving to DB
    return new Promise((res) => {
      const savedEntities = entities.map(e => ({...e, id: randInt()}));
      storage.items.push(...savedEntities);
      res({
        identifiers: savedEntities.map(e => ({id: e.id})),
      });
    });
  }
}

class EntityMapper {
  static mapToEntity(dto) {
    return {...dto};
  }
}



class Service {
  repository = new ItemsRepository();

  async *saveMany(dtos) {
    let start = 0;
    const size = CHUNK_SIZE;
    while (start < dtos.length) {
      const chunk = dtos.slice(start, start + size);
      start += size;
      const saved = await this.repository.insert(
        chunk.map((dto) => EntityMapper.mapToEntity(dto)),
      );
      for (const item of saved.identifiers) {
        yield item.id;
      }
    }
  }
}

(async () => {

  const repository = new ItemsRepository();
  await repository.insert([{name: 'Petro'}]);
  await repository.insert([{name: 'Petro'}]);
  await repository.insert([{name: 'Petro'}]);

  const dtos = new Array(100).fill({name: 'Mari ' + randInt()}).map(() => ({name: 'Mari ' + randInt()}));

  const service = new Service();

  for await (const id of service.saveMany(dtos)) {
    console.log(id);
  }
  // output DB
  console.log(storage.items);
  console.log('Total items: ' + storage.items.length);
})();


function randInt() {
  return Math.random() * 1000 << 0;
}



// class Service {
//   repository = new ItemsRepository();
//
//   async saveMany(dtos) {
//     const chunkSize = 65;
//     const chunks = chunkify(dtos, chunkSize);
//     const identifiers = [];
//     for (const chunk of chunks) {
//       const saved = await this.repository.insert(
//         chunk.map((dto) => EntityMapper.mapToEntity(dto)),
//       );
//       identifiers.push(...saved.identifiers.map((i) => i.id));
//     }
//     return identifiers;
//   }
// }
// function chunkify(array, size) {
//   const chunks = [];
//   let begin = 0;
//   const step = size;
//   let end = size;
//   while (begin < array.length) {
//     const chunk = array.slice(begin, end);
//     chunks.push(chunk);
//     begin += step;
//     end += step;
//   }
//   return chunks;
// }
