const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: '🎮'
  },
  accounts: [{
    credentials: {
      type: String,
      required: true
    },
    isUsed: {
      type: Boolean,
      default: false
    },
    usedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    usedAt: {
      type: Date
    }
  }],
  totalStock: {
    type: Number,
    default: 0
  },
  availableStock: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Atualizar contadores de estoque
serviceSchema.methods.updateStock = function() {
  this.totalStock = this.accounts.length;
  this.availableStock = this.accounts.filter(acc => !acc.isUsed).length;
};

module.exports = mongoose.model('Service', serviceSchema);



