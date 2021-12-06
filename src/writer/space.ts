import snapshot from '@snapshot-labs/snapshot.js';
import { ethers } from 'ethers';
import { getSpaceDB } from '../helpers/adapters/mysql';

export async function verify(body): Promise<any> {
  if (!ethers.utils.isAddress(body.daoAddress)) {
    return Promise.reject('invalid dao address');
  }

  // todo check dao contract exists in network

  const schemaIsValid = snapshot.utils.validateSchema(
    snapshot.schemas.space,
    body.settings
  );

  if (schemaIsValid !== true) {
    console.log('[writer] Wrong space format', schemaIsValid);
    return Promise.reject('wrong space format');
  }

  const s = await getSpaceDB(body.daoAddress);
  if (s) {
    return Promise.reject('space already exists');
  }
}
