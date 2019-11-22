<template>
	<div class="batch">
		<el-dialog width="455px" class="summaryDialog" :title="$t('page.summary')" :visible.sync="summaryVisible">
			<div class="item">
				<span class="label">{{ $t('page.taskName') }}</span
				><span class="value">{{ summary.name }}</span>
			</div>
			<div class="item">
				<span class="label">{{ $t('page.robot') }}</span
				><span class="value">{{ summary.botName }}</span>
			</div>
			<div class="item">
				<span class="label">{{ $t('page.createdName') }}</span
				><span class="value">{{ summary.insertTime }}</span>
			</div>
			<div class="item">
				<span class="label">{{ $t('page.startTime') }}</span
				><span class="value">{{ summary.startTime }}</span>
			</div>
			<div class="item">
				<span class="label">{{ $t('page.endTime') }}</span
				><span class="value">{{ summary.endTime }}</span>
			</div>
			<div class="item">
				<span class="label">{{ $t('page.importNumber') }}</span
				><span class="value">{{ summary.count }}</span>
			</div>
			<div class="percent">
				<span class="text-1">{{ $t('page.reached') }}: {{ summary.reached }}</span>
				<el-progress :width="170" :stroke-width="12" class="first" type="circle" :percentage="summary.reachedPercent"> </el-progress>
				<span class="text-2">{{ $t('page.unreached') }}: {{ summary.unReached }}</span>
				<el-progress :width="170" :stroke-width="12" type="circle" :percentage="summary.unReachedPercent"></el-progress>
			</div>
		</el-dialog>

		<div class="top">
			<el-select v-model="taskInput" filterable :placeholder="$t('page.taskName')">
				<el-option v-for="item in taskOptions" :key="item.index" :label="item.label" :value="item.value"> </el-option>
			</el-select>
			<el-button @click="searchData" class="search-button" type="primary">{{ $t('page.search') }}</el-button>
		</div>

		<div class="bahasa-table">
			<el-table :data="jobData.list">
				<el-table-column prop="taskName" :label="$t('page.taskName')"> </el-table-column>
				<el-table-column prop="botName" :label="$t('page.robot')"> </el-table-column>
				<el-table-column prop="status" :label="$t('page.status')"> </el-table-column>
				<el-table-column :label="$t('page.info')">
					<template slot-scope="scope">
						<span @click="summaryInfo(scope.row)" class="bahasa-link">{{ $t('page.summary') }}</span>
					</template>
				</el-table-column>
			</el-table>
		</div>

		<div class="bahasa-pagination">
			<el-pagination
				:page-sizes="paginations.page_sizes"
				:page-size="paginations.page_size"
				:pager-count="paginations.pager_count"
				:layout="paginations.layout"
				:total="jobData.total"
				:current-page="paginations.page_index"
				@current-change="handleCurrentChange"
				@size-change="handleSizeChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from '@/api'

export default {
	async asyncData({ store, route }) {
		const params = {
			current: 1,
			size: '',
			vo: {}
		}
		await Promise.all([
			store.dispatch('bot/getTaskList', params),
			store.dispatch('bot/getJobList', {
				current: 1,
				size: 15,
				vo: {}
			})
		])
	},

	computed: {
		taskOptions: function() {
			const taskData = this.$store.getters.taskData
			let list = []
			if (taskData.records && taskData.records.length > 0) {
				list = taskData.records.map((item, index) => {
					return {
						index,
						label: item.taskName,
						value: item.id
					}
				})
			}
			return list
		},

		jobData: function() {
			const jobData = this.$store.getters.jobData
			return {
				list: jobData.records,
				total: jobData.total
			}
		}
	},
	data() {
		return {
			summaryVisible: false,
			taskInput: '',
			summary: {},
			paginations: {
				page_index: 1, // 当前位于哪页
				total: 0, // 总数
				page_size: 15, // 1页显示多少条
				page_sizes: [15, 20, 40], // 每页显示多少条
				pager_count: 5,
				layout: 'total, sizes, prev, pager, next, jumper' // 翻页属性
			}
		}
	},
	methods: {
		async summaryInfo(row) {
			const data = await API(this.$store.$http).getJobSummary(row.id)
			const count = data.count
			const reached = data.answeredCount
			const unReached = count - reached
			const reachedPercent = count ? parseInt((reached / count) * 100) : 0
			const unReachedPercent = count ? 100 - reachedPercent : 0
			Object.assign(data, {
				reached,
				unReached,
				reachedPercent,
				unReachedPercent
			})
			this.summary = data
			this.summaryVisible = true
		},
		searchData() {
			this.getData()
		},
		getData() {
			const params = {
				current: this.paginations.page_index,
				size: this.paginations.page_size,
				vo: {
					taskId: this.taskInput
				}
			}
			this.$store.dispatch('bot/getJobList', params)
		},

		handleCurrentChange(val) {
			this.paginations.page_index = val
			this.getData()
		},
		handleSizeChange(val) {
			this.paginations.page_size = val
			this.getData()
		}
	}
}
</script>

<style lang="scss" scoped>
@import './style/index.scss';
</style>
