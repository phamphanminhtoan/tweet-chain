const moment = require('moment');
 
const BANDWIDTH_PERIOD = 86400;
const MAX_BLOCK_SIZE = 22020096;
const RESERVE_RATIO = 1;
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;

function calculateEnergy(account, currentBlockTime, txSize) {
  const diff = account.bandwidth
    ? moment(currentBlockTime).unix() - moment(account.bandwidth).unix()
    : BANDWIDTH_PERIOD;
  const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;

  const energy = account.energy ? account.energy : bandwidthLimit;
  // 24 hours window max 65kB
  const bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * energy + txSize);
  return bandwidthLimit - bandwidth;
}

module.exports = {calculateEnergy}