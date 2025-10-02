import { AxiosError } from 'axios';
import { components, type GroupBase, type OptionProps } from 'react-select';
import { AsyncPaginate, type LoadOptions } from 'react-select-async-paginate';
import { toast } from 'sonner';
import type { ReactSelectOption } from '@/04_types/_common/react-select-option';
import type { ServiceBrandCategory } from '@/04_types/service/service-brand-category';
import { mainInstance } from '@/07_instances/main-instance';

type SeviceBrandCategoryOptionData = {
  value: string;
  label: string;
  brand: string;
};

const CategoryOption = (
  props: OptionProps<SeviceBrandCategoryOptionData, false>,
) => (
  <components.Option {...props}>
    <div className="flex flex-col">
      <h6>{props.data.label}</h6>
      <small className="text-muted-foreground">{props.data.brand}</small>
    </div>
  </components.Option>
);

const ServiceBrandCategorySelect = ({ ...props }) => {
  const loadOptions: LoadOptions<
    SeviceBrandCategoryOptionData,
    GroupBase<SeviceBrandCategoryOptionData>,
    { page: number }
  > = async (searchQuery, _loadedOptions, additional = { page: 1 }) => {
    const page = additional.page || 1;

    try {
      const response = await mainInstance.get(
        `/select/service-brand-categories?page=${page}&search=${searchQuery}&sort=id`,
      );

      const options = response.data.records.map(
        (category: ServiceBrandCategory) => ({
          value: category.id,
          label: category.service?.label,
          brand: category.service_brand?.label,
        }),
      );

      return {
        options,
        hasMore: response.data.meta.total_pages > page,
        additional: {
          page: page + 1,
        },
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || 'An error occurred',
        );
      } else {
        toast.error('An unknown error occurred');
      }

      return {
        options: [],
        hasMore: false,
      };
    }
  };

  const shouldLoadMore = (
    scrollHeight: number,
    clientHeight: number,
    scrollTop: number,
  ) => {
    return scrollHeight - (scrollTop + clientHeight) < clientHeight * 5;
  };

  return (
    <AsyncPaginate
      className="react-select-container w-full"
      classNamePrefix="react-select"
      loadOptions={loadOptions}
      debounceTimeout={200}
      additional={{
        page: 1,
      }}
      components={{ Option: CategoryOption }}
      shouldLoadMore={shouldLoadMore}
      {...(props.isMulti && {
        filterOption: (candidate: ReactSelectOption) => {
          const selectedValues = (props.value || []).map(
            (item: ReactSelectOption) => item.value.toString(),
          );
          return !selectedValues.includes(candidate.value.toString());
        },
      })}
      {...props}
    />
  );
};

export default ServiceBrandCategorySelect;
