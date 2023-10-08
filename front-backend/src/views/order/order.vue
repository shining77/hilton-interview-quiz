<template>
  <div id="order">
    <div class="logout">
      <i class="el-icon-back" @click="logout"></i>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="当前定单" name="currentOrder">
      <i class="el-icon-circle-plus add" @click="addOrder"></i>
      <el-scrollbar class="history_sheet_detail_scroll" style="height: 90vh">
        <el-card v-for="(order, index) in currentList" :key="index" class="box-card" style="margin-bottom: 20px">
          <div slot="header" class="clearfix">
            <span>{{ order.date }} {{ order.time }}  </span>
            <el-tag type="success" effect="dark" v-if="order.status === 1">预订中</el-tag>
            <el-tag type="info" effect="dark" v-if="order.status === 2">已取消</el-tag>
            <span style="float: right; padding: 3px 0">{{ order.table }}桌</span>
          </div>
          <div class="contain">
            <div class="left">
              <div style="font-weight: bold">{{ order.username }}</div>
              <div>{{ order.phone }}</div>
            </div>
            <div class="right"  v-if="order.status === 1">
              <el-button type="primary" @click="editOrder(order)">编辑</el-button>
              <el-button type="danger" @click="cancelOrder(order)">取消</el-button>
            </div>
          </div>
        </el-card>
      </el-scrollbar>
    </el-tab-pane>
    <el-tab-pane label="历史定单" name="historyOrder">
      <el-card v-for="(order, index) in historyList" :key="index" class="box-card" style="margin-bottom: 20px">
        <div slot="header" class="clearfix">
          <span>{{ order.date }} {{ order.time }}  </span>
          <span style="float: right; padding: 3px 0">{{ order.table }}桌</span>
        </div>
        <div class="contain">
          <div class="left">
            <div style="font-weight: bold">{{ order.username }}</div>
            <div>{{ order.phone }}</div>
          </div>
          <div class="right"  v-if="order.status === 1">
            <el-button type="primary" @click="editOrder(order)">编辑</el-button>
            <el-button type="danger" @click="cancelOrder(order)">取消</el-button>
          </div>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="90%"
      top="10px"
      >
      <el-form>
        <el-form-item label="预订人">
          <el-input v-model="orderForm.username"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="orderForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="要几桌">
          <el-input-number style="width: 100%" v-model="orderForm.table" :step="1" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="预定日期">
          <el-date-picker
            style="width: 100%"
            v-model="orderForm.date"
            :picker-options="alarmTimePickerOptions()"
            value-format="yyyy-MM-dd"

            placeholder="选择日期时间">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="预定时间">
          <el-time-select
            style="width: 100%"
            v-model="orderForm.time"
            :picker-options="{
              start: '09:00',
              step: '00:30',
              end: '21:00'
            }"
            value-format="HH:mm:ss"
            placeholder="选择时间">
          </el-time-select>
        </el-form-item>
      </el-form>
      <el-button style="width: 100%" type="primary" @click="submit">预约</el-button>
  </el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { dateFormat } from '@/util/util';
  export default {
    name: 'order',
    data() {
      return {
        activeName: 'currentOrder',
        dialogVisible: false,
        orderForm: {
          date: '',
          time: '',
          table: 1,
          username: '',
          phone: '',
          status: 1,
        },
        currentList: [],
        historyList: [],
        totalList: [],
      };
    },
    created() {
      if (!this.userId) {
        this.$router.push({ path: '/' });
      } else {
        this.currentOrder();
      }
    },
    computed: {
		...mapGetters(['userId', 'isEmployee']),
	},
    methods: {
      handleClick(e) {
        switch(this.activeName) {
          case "currentOrder": this.currentOrder();break;
          case "historyOrder": this.historyOrder();break;
        }

      },
      currentOrder() {
        const guests_str = `guests_id: "${this.userId}"`;
        const gql = `{ order(
          ${this.isEmployee ? "" : guests_str}
          startDate: "${dateFormat(new Date(), "yyyy-MM-dd")}"
          ) {phone status date time table guests_id username _id}}`;
        this.$gqlQuery(gql)
            .then(data => {
              this.currentList = [...data.data.order];
            })
      },
      historyOrder() {
        const guests_str = `guests_id: "${this.userId}"`;
        const gql = `{ order(
          ${this.isEmployee ? "" : guests_str}
          endDate: "${dateFormat(new Date(), "yyyy-MM-dd")}"
          ) {phone status date time table username _id}}`;
        this.$gqlQuery(gql)
            .then(data => {
              this.historyList = [...data.data.order];
            })
      },
      addOrderSubmit() {
        if (!this.isEmployee) {
          this.orderForm.guests_id = this.userId;
        }
        const gql = `mutation { addOrder(input: {
          date: "${this.orderForm.date}"
          time: "${this.orderForm.time}"
          table: ${this.orderForm.table}
          username: "${this.orderForm.username}"
          phone: "${this.orderForm.phone}"
          status: ${this.orderForm.status}
          guests_id: "${this.orderForm.guests_id}"
        }){_id}}`;

        return gql;
      },
      editOrderSubmit() {
        const gql = `mutation { updateOrder(input: {
          _id: "${this.orderForm._id}"
          date: "${this.orderForm.date}"
          time: "${this.orderForm.time}"
          table: ${this.orderForm.table}
          username: "${this.orderForm.username}"
          phone: "${this.orderForm.phone}"
          status: ${this.orderForm.status}
          guests_id: "${this.orderForm.guests_id}"
        }){_id}}`;

        return gql;

      },
      submit() {
        let gql;
        if (this.orderForm.guests_id) {
          gql = this.editOrderSubmit();
        } else {
          gql = this.addOrderSubmit();
        }
        this.$gqlMutation(gql)
          .then(data => {
            this.$message.success("操作成功！");
            this.dialogVisible = false;
            this.currentOrder();
          })
      },
      alarmTimePickerOptions() {
        return {
          start: '09:00',
          step: '00:30',
          end: '21:00',

          disabledDate(time) {
            return time.getTime() < new Date().getTime();
          }
        };
      },
      addOrder() {
        this.orderForm = {
          date: '',
          time: '',
          table: 1,
          username: '',
          phone: '',
          status: 1,
        };
        this.dialogVisible = true;
      },
      editOrder(order) {
        this.orderForm = order;
        this.dialogVisible = true;
      },
      cancelOrder(order) {
        this.$confirm(`确认要取消该预订吗？`, '取消该预订确认', {
          confirmButtonText: '我要取消',
          cancelButtonText: '考虑一下',
        })
        .then(async _ => {
          const gql = `mutation { candelOrder(input: {
          status: 2
          _id: "${order._id}"
        }){_id}}`;
        this.$gqlMutation(gql)
          .then(data => {
            this.$message.success("取消成功！");
            this.currentOrder();
          })

        })
        .catch(_ => {});
      },
      logout() {
        this.$confirm(`确认登出吗？`)
        .then(async _ => {
          this.$store.commit('setUserId', '');
          this.$router.push({ path: '/' });
        })
        .catch(_ => {});


      },
    }
  }
</script>

<style lang="scss">
.contain {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.add {
  font-size: 36px;
  position: fixed;
  right: 44px;
  top: 5px;
  color: #409EFF;
}

.el-message-box {
  width: 70vw;
}

.logout {
  z-index: 999;
  background-color: #F56C6C;

  position: fixed;
  right: 10px;
  top: 8px;
  width: 30px;
  height: 30px;
  border-radius: 15px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  i {
    font-size: 20px;
    color: white;

  }
}
</style>
